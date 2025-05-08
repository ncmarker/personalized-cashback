#!/bin/bash

echo "Registering Datagen Connectors..."

# Function to check if a connector exists
check_connector() {
  curl -s http://connect:8083/connectors | grep -q "\"$1\""
}

# Register transactions connector
if check_connector "datagen-transactions"; then
  echo "Connector 'datagen-transactions' already exists. Skipping..."
else
  curl -X POST http://connect:8083/connectors \
    -H "Content-Type: application/json" \
    -d '{
      "name": "datagen-transactions",
      "config": {
        "connector.class": "io.confluent.kafka.connect.datagen.DatagenConnector",
        "kafka.topic": "transactions",
        "schema.filename":"/data/schemas/transactions.arvo",
        "key.converter": "org.apache.kafka.connect.storage.StringConverter",
        "value.converter": "org.apache.kafka.connect.json.JsonConverter",
        "max.interval": 2000,
        "iterations": 100
      }
    }'
  echo "Registered 'datagen-transactions'"
fi

# Register inventory connector
if check_connector "datagen-inventory"; then
  echo "Connector 'datagen-inventory' already exists. Skipping..."
else
  curl -X POST http://connect:8083/connectors \
    -H "Content-Type: application/json" \
    -d '{
      "name": "datagen-inventory",
      "config": {
        "connector.class": "io.confluent.kafka.connect.datagen.DatagenConnector",
        "kafka.topic": "inventory",
        "schema.filename":"/data/schemas/inventory.arvo",
        "key.converter": "org.apache.kafka.connect.storage.StringConverter",
        "value.converter": "org.apache.kafka.connect.json.JsonConverter",
        "max.interval": 2000,
        "iterations": 100
      }
    }'
  echo "Registered 'datagen-inventory'"
fi

echo "All connectors registered!"
