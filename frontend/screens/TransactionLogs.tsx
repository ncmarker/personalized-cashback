import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { TransactionMessage } from '../types';

type TransactionLogsProps = {
    transactionLogs: TransactionMessage[];
    route: RouteProp<any, any>;
    navigation: any;
  };

const TransactionLogs: React.FC<TransactionLogsProps> = ({ transactionLogs, route, navigation }) => {

  return (
    <View style={styles.container}>
        <Text style={styles.header}>Transaction Logs</Text>
        { transactionLogs.length ? 
        <FlatList
            data={transactionLogs}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
            <View style={styles.log}>
                <Text style={styles.logText}>Store ID: {item.storeId}</Text>
                <Text style={styles.logText}>User ID: {item.userId}</Text>
                <Text style={styles.logText}>Items:</Text>
                {item.items.map((itm, idx) => (
                <Text style={styles.logText} key={idx}>- Item ID: {itm.itemId}, Quantity: {itm.quantity}</Text>
                ))}
            </View>
            )}
        />
        : 
        <Text style={styles.logText}>No logs to display</Text> }
    </View>
  );
}

export default TransactionLogs;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 16 },
  header: { fontSize: 24, color: '#f8fafc', fontWeight: 'bold', marginBottom: 12 },
  log: { paddingVertical: 4, borderBottomColor: '#334155', borderBottomWidth: 1, color: '#f8fafc' },
  logText: { color: '#f8fafc' },
});
