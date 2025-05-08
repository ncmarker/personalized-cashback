import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { InventoryMessage } from '../types';

type InventoryLogsProps = {
    inventoryLogs: InventoryMessage[];
    route: RouteProp<any, any>;
    navigation: any;
  };

const InventoryLogs: React.FC<InventoryLogsProps> = ({ inventoryLogs, route, navigation }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Inventory Logs</Text>
      { inventoryLogs.length ? 
      <FlatList
        data={inventoryLogs}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.log}>
            <Text style={styles.logText}>Store ID: {item.storeId}</Text>
            <Text style={styles.logText}>Item ID: {item.itemId}</Text>
            <Text style={styles.logText}>Stock: {item.stock}</Text>
            <Text style={styles.logText}>Price: {item.price}</Text>
            <Text style={styles.logText}>Category: {item.category}</Text>
          </View>
        )}
      />
      :
      <Text style={styles.logText}>No logs to display</Text> }
    </View>
  );
}

export default InventoryLogs;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172b', padding: 16 },
  header: { fontSize: 24, color: '#f8fafc', fontWeight: 'bold', marginBottom: 12 },
  log: { paddingVertical: 4, borderBottomColor: '#334155', borderBottomWidth: 1, color: '#f8fafc' },
  logText: { color: '#f8fafc' },
});
