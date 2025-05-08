import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { calculateCashbackOpportunities } from '../cashbackUtils';
import { useState } from 'react';
import { InventoryMessage, TransactionMessage, CashbackReward } from '../types';

type MainAnalysisProps = {
    inventoryLogs: InventoryMessage[];
    transactionLogs: TransactionMessage[];
    route: RouteProp<any, any>;
    navigation: any;
  };


const MainAnalysis: React.FC<MainAnalysisProps> = ({ inventoryLogs, transactionLogs, route, navigation }) => {

  const [rewards, setRewards] = useState<CashbackReward[]>([]);

  return (
    <View style={styles.container}>

      <Text style={styles.header}>Personalized Cashback Dashboard</Text>
      
      <TouchableOpacity 
        style={styles.btn}
        onPress={() => navigation.navigate('Transactions', { transactionLogs })}
        >
            <Text>View Transaction Logs</Text>
      </TouchableOpacity> 

      <TouchableOpacity 
        style={styles.btn}
        onPress={() => navigation.navigate('Inventory', { inventoryLogs })}
        >
            <Text>View Inventory Logs</Text>
      </TouchableOpacity> 
      
      <TouchableOpacity 
        style={styles.btn}
        onPress={() => {
          const newRewards = calculateCashbackOpportunities(inventoryLogs, transactionLogs);
          setRewards(newRewards);
        }}
        >
            <Text>Refresh Cashback Rewards</Text>
      </TouchableOpacity> 
  
        <Text style={styles.subHeader}>Available Cashback Rewards:</Text>
        {rewards.length === 0 ? (
          <Text style={styles.text}>No rewards currently available.</Text>
        ) : (
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            {rewards.map((reward, idx) => (
              <View key={idx} style={styles.rewardBox}>
                <Text style={styles.rewardText}>
                  🎉 User {reward.userId} qualifies for {reward.cashbackRate}% cashback on {reward.category} items at store {reward.storeId}.
                </Text>
                <Text style={styles.reasonText}>Reasoning: {reward.reason}</Text>
                <Text></Text>
                <Text style={styles.reasonText}>Other qualifying rewards: {reward.otherRewards}</Text>
              </View>
            ))}
          </ScrollView>
        )}
    </View>
  );
}

export default MainAnalysis;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 16 },
  header: { fontSize: 24, color: '#f8fafc', fontWeight: 'bold', marginBottom: 12 },
  btn: { alignItems: 'center', backgroundColor: '#DDDDDD', padding: 10, borderRadius: 10, marginTop: 5,  marginBottom: 5 },
  subHeader: { fontSize: 18, color: '#f8fafc', fontWeight: '600', marginTop: 16, marginBottom: 8 },
  rewardBox: { backgroundColor: '#1e293b', padding: 10, borderRadius: 10, marginBottom: 6 },
  text: { color: '#f8fafc' },
  rewardText: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: '#f8fafc' },
  reasonText: { fontSize: 14, color: '#e1e3e5', fontStyle: 'italic' },
});
