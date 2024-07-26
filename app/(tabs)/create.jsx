import { ScrollView, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Create = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <Text className="text-white text-3xl">Create Page</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create