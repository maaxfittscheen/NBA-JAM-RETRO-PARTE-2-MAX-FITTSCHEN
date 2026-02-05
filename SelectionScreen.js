import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, SafeAreaView } from 'react-native';
import { TEAMS } from './teamsData.js'; 

export default function SelectionScreen({ navigation }) {
  const [local, setLocal] = useState(null);
  const [visitante, setVisitante] = useState(null);

  const selectTeam = (team) => {
    if (!local) setLocal(team);
    else if (!visitante && team.id !== local.id) setVisitante(team);
    else { setLocal(team); setVisitante(null); } // Reset si ya están ambos
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.mainTitle}>SELECT TEAMS</Text>

        <View style={styles.selectionPreview}>
          <View style={styles.previewBox}>
            <Text style={styles.retroLabel}>LOCAL</Text>
            <View style={styles.whiteCard}>
               {local && <Image source={{ uri: local.logo }} style={styles.logoSmall} />}
            </View>
            <Text style={styles.teamName}>{local?.name || '???'}</Text>
          </View>

          <Text style={styles.vsCenter}>VS</Text>

          <View style={styles.previewBox}>
            <Text style={styles.retroLabel}>VISITANTE</Text>
            <View style={styles.whiteCard}>
               {visitante && <Image source={{ uri: visitante.logo }} style={styles.logoSmall} />}
            </View>
            <Text style={styles.teamName}>{visitante?.name || '???'}</Text>
          </View>
        </View>

        <FlatList
          data={TEAMS}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.card, (local?.id === item.id || visitante?.id === item.id) && styles.selectedCard]} 
              onPress={() => selectTeam(item)}
            >
              <View style={styles.logoContainerWhite}>
                <Image source={{ uri: item.logo }} style={styles.listLogo} />
              </View>
              <Text style={styles.listText}>{item.name.toUpperCase()}</Text>
            </TouchableOpacity>
          )}
        />

        {(local && visitante) && (
          <TouchableOpacity 
            style={styles.startBtn} 
            onPress={() => navigation.navigate('Game', { local, visitante })}
          >
            <Text style={styles.startBtnText}>START MATCH</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  container: { flex: 1, alignItems: 'center', padding: 10 },
  mainTitle: { color: '#fff', fontSize: 32, fontWeight: '900', fontStyle: 'italic', marginVertical: 15 },
  selectionPreview: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, backgroundColor: '#111', padding: 15, borderRadius: 15, borderWidth: 1, borderColor: '#333' },
  previewBox: { alignItems: 'center', width: 110 },
  retroLabel: { 
    color: '#FFD700', fontSize: 20, fontWeight: '900', fontStyle: 'italic', 
    textShadowColor: '#ff4444', textShadowRadius: 8, marginBottom: 10 
  },
  whiteCard: { backgroundColor: '#FFF', padding: 5, borderRadius: 8, width: 80, height: 80, justifyContent: 'center', alignItems: 'center' },
  logoSmall: { width: 65, height: 65, resizeMode: 'contain' },
  teamName: { color: '#fff', fontWeight: 'bold', marginTop: 5, fontSize: 14 },
  vsCenter: { color: '#ff4444', fontSize: 24, fontWeight: '900', marginHorizontal: 10 },
  card: { backgroundColor: '#1a1a1a', margin: 8, padding: 15, alignItems: 'center', width: '45%', borderRadius: 10, borderWidth: 1, borderColor: '#444' },
  selectedCard: { borderColor: '#FFD700', backgroundColor: '#332b00' },
  logoContainerWhite: { backgroundColor: '#FFF', padding: 8, borderRadius: 10, width: 80, height: 80, justifyContent: 'center', alignItems: 'center' },
  listLogo: { width: 65, height: 65, resizeMode: 'contain' },
  listText: { color: '#fff', marginTop: 10, fontWeight: '900', fontSize: 12 },
  startBtn: { backgroundColor: '#ff4444', padding: 15, width: '90%', borderRadius: 5, alignItems: 'center', marginTop: 10, borderWidth: 2, borderColor: '#fff' },
  startBtnText: { color: '#fff', fontWeight: '900', fontSize: 20 }
});