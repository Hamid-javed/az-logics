import { StyleSheet, View } from 'react-native'
import React, { memo, useState, useEffect } from 'react'
import { SvgXml } from 'react-native-svg'
import Label from '../reuseables/label/Label'
import Photo from '../reuseables/photo/Photo'
import Pressable from '../reuseables/pressable/Pressable'
import { COLOR, TEXT_STYLE, hp, wp, commonStyles } from '../../enums/StyleGuide'

interface DashboardCardProps {
  title: string
  value: string | number
  icon?: string | React.ReactNode
  onPress?: () => void
}

// Function to strip HTML tags from text
const stripHtmlTags = (html: string): string => {
  return html.replace(/<[^>]*>/g, '')
}

// Function to parse title and extract main title and type
const parseTitle = (title: string) => {
  const cleanTitle = stripHtmlTags(title)
  
  // Only apply color styling for "Collection today" items
  const isToday = cleanTitle.toLowerCase().includes('today')
  
  // Check for (Cash) or (Online)
  const cashMatch = cleanTitle.match(/(.+?)\s*\(Cash\)/i)
  const onlineMatch = cleanTitle.match(/(.+?)\s*\(Online\)/i)
  
  if (cashMatch) {
    return {
      mainTitle: cashMatch[1].trim(),
      type: '(Cash)',
      typeColor: isToday ? COLOR.green : COLOR.black 
    }
  }
  
  if (onlineMatch) {
    return {
      mainTitle: onlineMatch[1].trim(),
      type: '(Online)',
      typeColor: isToday ? COLOR.purple : COLOR.black 
    }
  }
  
  return {
    mainTitle: cleanTitle,
    type: null,
    typeColor: null
  }
}

// Function to fetch SVG content and render it
const SvgIcon = ({ uri }: { uri: string }) => {
  const [svgContent, setSvgContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (uri && uri.endsWith('.svg')) {
      fetch(uri)
        .then((response) => response.text())
        .then((text) => {
          setSvgContent(text)
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }, [uri])

  if (loading || !svgContent) {
    return null
  }

  return <SvgXml xml={svgContent} width={hp(4)} height={hp(4)} />
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, onPress }) => {
  // Parse title to extract main title and type (Cash/Online)
  const parsedTitle = parseTitle(title)

  const CardContent = (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.textContainer}>
          <Label style={styles.title} numberOfLines={10}>
            {parsedTitle.mainTitle}
            {parsedTitle.type && (
              <>
                {'\n'}
                <Label style={styles.typeLabel} color={parsedTitle.typeColor} numberOfLines={10}>
                  {parsedTitle.type}
                </Label>
              </>
            )}
          </Label>
         
        </View>
        {icon && (
          <View style={[styles.iconContainer]}>
            {typeof icon === 'string' && icon.endsWith('.svg') ? (
              <SvgIcon uri={icon} />
            ) : typeof icon === 'string' ? (
              <Photo url={icon} style={styles.iconImage} contain />
            ) : (
              icon
            )}
          </View>
        )}
      </View>
      <View style={styles.bottomSection}>
        <Label style={styles.value} color={COLOR.black}>{value}</Label>
      </View>
    </View>
  )

  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        {CardContent}
      </Pressable>
    )
  }

  return CardContent
}

export default memo(DashboardCard)

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    borderRadius: hp(1),
    padding: hp(1.5),
    marginBottom: hp(1),
    ...commonStyles.shadow_3,
    height: hp(12),
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: '70%',
  },
  textContainer: {
    flex: 1,
    marginRight: wp(3),
    flexShrink: 1,
  },
  title: {
    ...TEXT_STYLE.smallTextSemiBold,
  },
  typeLabel: {
    ...TEXT_STYLE.smallTextMedium,
  },
  bottomSection: {
    height: '30%',
    justifyContent: 'flex-end',
  },
  value: {
    ...TEXT_STYLE.bigTextBold,
    
  },
  iconContainer: {
    width: hp(3),
    height: hp(3),
    borderRadius: hp(1.5),
    ...commonStyles.center,
  },
  iconImage: {
    width: hp(3),
    height: hp(3),
  },
})
