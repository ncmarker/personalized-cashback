import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InventoryMessage, TransactionMessage } from './types';

import MainAnalysis from './screens/MainAnalysis';
import InventoryLogs from './screens/InventoryLogs';
import TransactionLogs from './screens/TransactionLogs';

const Stack = createNativeStackNavigator();

export default function App() {
  const [inventoryLogs, setInventoryLogs] = useState<InventoryMessage[]>([]);
  const [transactionLogs, setTransactionLogs] = useState<TransactionMessage[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  // websocket connection
  useEffect(() => {
    const ws = new WebSocket('ws://192.168.0.156:8081');
    wsRef.current = ws;

    // read and classify messages from kafka consumer
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const { type, payload } = data;

      if (type === 'inventory') {
        setInventoryLogs((prev) => [...prev, payload]);
      } else if (type === 'transaction') {
        setTransactionLogs((prev) => [...prev, payload]);
      }
    };

    return () => ws.close();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" options={{ title: "Cashback Analysis" }}>
          {props => <MainAnalysis {...props} inventoryLogs={inventoryLogs} transactionLogs={transactionLogs} />}
        </Stack.Screen>
        <Stack.Screen name="Inventory">
          {props => <InventoryLogs {...props} inventoryLogs={inventoryLogs} />}
        </Stack.Screen>
        <Stack.Screen name="Transactions">
          {props => <TransactionLogs {...props} transactionLogs={transactionLogs} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
