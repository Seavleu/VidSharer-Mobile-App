import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Link } from 'expo-router'

export default function App() {
  return (
    <View>
      <Text>index</Text>
      <StatusBar style="auto"/>
      <Link href='/profile'>Go to Profile</Link>
    </View>
  )
}

const styles = StyleSheet.create({
    
})