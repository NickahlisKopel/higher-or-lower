import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ModeToggleProps = {
  currentMode: number;
  onSelectMode: (mode: number) => void;
  unlockedModes: number[];
};

export default function ModeToggle({ currentMode, onSelectMode, unlockedModes }: ModeToggleProps) {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => setVisible(prev => !prev);
  
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={toggleVisible} style={styles.button}>
        <Text style={styles.text}>Mode: {currentMode} ⌄</Text>
      </TouchableOpacity>
      {visible && (
        <View style={styles.dropdown}>
          {unlockedModes.map((mode) => (
            <TouchableOpacity
              key={mode}
              onPress={() => {
                onSelectMode(mode);
                setVisible(false);
              }}
              style={styles.dropdownItem}
            >
              <Text style={styles.dropdownText}>{mode}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 100,
  },
  button: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 3,
  },
  text: {
    color: 'white',
    fontWeight: '600',
  },
  dropdown: {
    backgroundColor: '#444',
    borderRadius: 10,
    marginTop: 6,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dropdownText: {
    color: 'white',
  },
});
