import React, { ReactNode } from 'react'
import { View, Text, StyleSheet, GestureResponderEvent, TextStyle } from 'react-native'
import { JolocomTheme } from 'src/styles/jolocom-theme'

// TODO Self signed or not
// TODO Generic group component as opposed to view for flex grouping
// TODO Custom text component with size, font, color
// TODO Make whole card clickable as opposed to icon
// TODO Changes to the 'Container' custom component to allow horisontal flex
interface ClaimCardProps {
  rightIcon?: ReactNode
  secondaryText?: string | ReactNode
  primaryText: string | ReactNode
  primaryTextStyle?: TextStyle
  secondaryTextStyle?: TextStyle
}

export const ClaimCard: React.SFC<ClaimCardProps> = props => {
  const styles = StyleSheet.create({
    primaryText: {
      fontFamily: JolocomTheme.contentFontFamily,
      fontSize: JolocomTheme.headerFontSize,
      color: JolocomTheme.primaryColorBlack,
      fontWeight: '100'
    },
    secondaryText: {
      fontSize: 17,
      opacity: 0.4
    }
  })

  const { primaryText, secondaryText, rightIcon } = props
  return (
    <View>
      <View>
        <Text style={[styles.primaryText, styles.secondaryText, props.secondaryTextStyle]}> {secondaryText} </Text>
        <Text style={[styles.primaryText, props.primaryTextStyle]}> {primaryText} </Text>
      </View>
      {rightIcon}
    </View>
  )
}

interface EmptyClaimCardProps {
  credentialType: string
  onEdit: (e: GestureResponderEvent) => void
}

export const PlaceholderClaimCard: React.SFC<EmptyClaimCardProps> = props => (
  <ClaimCard
    key={props.credentialType}
    primaryText={<Text onPress={props.onEdit}>+ add</Text>}
    primaryTextStyle={{ color: JolocomTheme.primaryColorPurple }}
    secondaryText={<Text>{props.credentialType}</Text>}
    secondaryTextStyle={{ opacity: 1 }}
  />
)