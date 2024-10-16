import React, { useState, useEffect, useRef } from 'react'
import { View, Platform, KeyboardAvoidingView, SafeAreaView, Text, StyleSheet } from 'react-native'
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  IMessage,
  User,
  BubbleProps,
  InputToolbarProps,
  Send
} from 'react-native-gifted-chat'

const chatbotAvatar = require('@/assets/images/chatbot-avatar.png')

interface ChatMessage extends IMessage {
  user: User
}

export default function Index() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const ws = useRef<WebSocket | null>(null)

  useEffect(() => {
    const userId = '281470212954652675'
    ws.current = new WebSocket(`wss://agents.leomconti.com.br/sockets/chat/${userId}`)

    ws.current.onopen = () => {
      console.log('WebSocket connection opened')
    }

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data)
      console.log('Received message:', data)

      if (data.type === 'message') {
        const message: ChatMessage = {
          _id: data._id || Math.round(Math.random() * 1000000),
          text: data.content,
          createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
          user: {
            _id: data.user_id || 2,
            name: data.user_name || 'Psyche',
            avatar: chatbotAvatar
          }
        }
        setMessages((previousMessages) => GiftedChat.append(previousMessages, [message]))
      } else if (data.type === 'system') {
        // Handle system messages
      } else if (data.type === 'sync') {
        // Handle sync messages if necessary
      } else {
        console.warn('Unknown message type:', data.type)
      }
    }

    ws.current.onerror = (e: Event) => {
      console.error('WebSocket error:', (e as ErrorEvent).message)
    }

    ws.current.onclose = () => {
      console.log('WebSocket connection closed')
    }

    return () => {
      ws.current?.close()
    }
  }, [])

  const onSend = (newMessages: ChatMessage[] = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages))

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      newMessages.forEach((msg) => {
        const messageToSend = {
          type: 'message',
          content: msg.text
        }
        ws.current?.send(JSON.stringify(messageToSend))
      })
    } else {
      console.error('WebSocket is not open')
    }
  }

  const renderBubble = (props: BubbleProps<ChatMessage>) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#8A2BE2',
            borderRadius: 15,
            padding: 5
          },
          left: {
            backgroundColor: '#9370DB',
            borderRadius: 15,
            padding: 5
          }
        }}
        textStyle={{
          right: {
            color: '#FFFFFF'
          },
          left: {
            color: '#FFFFFF'
          }
        }}
      />
    )
  }

  const renderInputToolbar = (props: InputToolbarProps<ChatMessage>) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#F8F4FF',
          borderTopWidth: 1,
          borderTopColor: '#9370DB',
          padding: 8,
          borderRadius: 20,
          margin: 10
        }}
        primaryStyle={{ alignItems: 'center' }}
      />
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#2E0854' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <View style={styles.backgroundContainer}>
          <View style={styles.backgroundOverlay} />
        </View>
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{
            _id: 1
          }}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          alwaysShowSend
          renderSend={(props) => (
            <Send {...props} containerStyle={styles.sendContainer}>
              <View style={styles.sendButton}>
                <Text style={styles.sendButtonText}>Send</Text>
              </View>
            </Send>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#2E0854'
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(138, 43, 226, 0.1)'
  },
  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 5
  },
  sendButton: {
    backgroundColor: '#8A2BE2',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold'
  }
})
