// LoginStyles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 32,
    marginTop: 32, // Added some top margin
  },
  signInText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  toggleButton: {
    position: 'absolute',
    right: 16,
    top: 12,
  },
  toggleText: {
    color: '#c4a675',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    height: 50,
    borderRadius: 8,
    backgroundColor: '#c4a675',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end', 
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#c4a675',
    fontWeight: 'bold',
    fontSize: 14,
  },
  registerButton: {
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c4a675',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto', 
    marginBottom: 8, 
  },
  registerButtonText: {
    color: '#c4a675',
    fontSize: 16,
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
});