import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DatePicker from 'react-native-date-picker'


export default function EndDate(props:any) {
  return (
    <View>
      <DatePicker
        modal
        open={props.open}
        date={props.date}
        mode='date'
        onConfirm={props.confirmation}
        onCancel={props.cancelation}
      />
    </View>
  )
}

const styles = StyleSheet.create({})