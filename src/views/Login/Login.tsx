import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from '../../components';
const img = require('../../assets/images/todo.png');

export const Login = () => {
  const handleLogin = () => {};
  return (
    <View>
      <View style={styles.imageContainer}>
        <Image source={img} style={styles.image} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>To Do</Text>
        <Text style={styles.description}>
          Elevate your productivity with our ToDo app. Effortlessly manage
          tasks, anytime, anywhere.
        </Text>
        <Button onPress={handleLogin} title="Login" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 500,
    backgroundColor: '#F7EBFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 50,
    fontWeight: '400',
    marginVertical: 30,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 50,
  },
});