import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
  Picker,
  Switch,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';
import color from '../../../utils/color';
import { font } from '../../../utils/font';

const FORM_ITEMS = ['title', 'description', 'address', 'district']

function checkIfBlank(value) {
  if( value && value.trim() !== ''){
    return false
  }

  return true
}

class AddScreen extends React.Component{
// const AddScreen = (props) => {
  // const [title, setTitle] = useState('')
  // const [description, setDescription] = useState('')
  // const [date, setDate] = useState('')
  // const [address, setAddress] = useState('')

  // adding title to the header
  static navigationOptions = {
    title: 'Post Blood Requirment'
  }

  state = {
    title: '',
    description: '',
    address: '',
    district: '',
    isUrgent: false,
    focusedItem: '',
    dataSubmissionStatus: null,
    dataSubmissionError: null
  }
  picker = React.createRef()

  handleValueChange = (input, value) => {
    console.log('input', input)
    console.log('value', value)
    this.setState(
      { [input]: value },
      () => this.validateFormItem(input)
    )
  }

  handleFocus = (input) => {
    this.setState({ focusedItem: input })
  }

  handleBlur = (input) => {
    console.log('blur input', input)
    this.setState({ focusedItem: '' })
  }

  focusPicker = () => {
    console.log('focusPicker')
    this.picker.current.focus()
  }

  handleCancel = () => {
    this.props.navigation.navigate('Home')
  }

  handleSubmit = () => {
    if (this.checkIfFormIsValid()) {
      this.setState({dataSubmissionStatus: 'SAVING'})
      // call API to save data
      this.saveDataToDB()
    }
  }

  checkIfFormIsValid = () => {
    // no need to valida `isActive`
    const isActiveIndex = FORM_ITEMS.indexOf('isActive')
    if (isActiveIndex > -1) {
      FORM_ITEMS.splice(isActiveIndex, 1)
    }
    const formErrors = FORM_ITEMS.map(item =>
      this.validateFormItem(item)
    )
    const hasError = (errorMsg) => {
      return typeof errorMsg === 'string'
    }
    
    if (formErrors.some(hasError)) {
      return false
    }
    return true
  }

  validateFormItem = (formItem) => {
    // let errorMsg
    const value = this.state[formItem]
    const errorMsg = checkIfBlank(value) 
      ? 'Value cannot be empty' : null
    this.setState(prevState => ({ 
      error: {
      ...prevState.error,
        [formItem]: errorMsg
      }
    }))

    return errorMsg
  }

  saveDataToDB = () => {
    console.log('Saving Data')
    this.setState({ 
      dataSubmissionStatus: 'COMPLETED',
      dataSubmissionError: null
    })
    // this.setState({
    //   dataSubmissionStatus: 'ERROR',
    //   dataSubmissionError: 'Error while saving data. (401 - Server Error)'
    // })
    // display success message
    // navigate to home
    this.props.navigation.navigate('Home')
  }

  render() {
    const { error } = this.state
    console.log('error', error)
    console.log('state', this.state)

    return (
      <View style={styles.addScreen__container}>
        <View>
          <Text>Title</Text>
          <TextInput
            name='title'
            style={styles.textInput}
            value={this.state.title}
            placeholder='Enter title'
            selectionColor={color.BLUE_LIGHT}
            underlineColorAndroid={this.state.focusedItem === 'title'
              ? color.BLUE_LIGHT 
              : error && error.title
                ? color.APP_BRAND_DARKER
                : color.GREY_LIGHT
            }
            placeholderTextColor={error && error.title
              ? color.APP_BRAND_DARKER
              : null
            }
            blurOnSubmit={false}
            onFocus={()=>this.handleFocus('title')}
            onBlur={()=>this.handleBlur('title')}
            onSubmitEditing={Keyboard.dismiss}
            onChange={(e) => this.handleValueChange('title', e.nativeEvent.text)}
          />
          {error && error['title'] && (
            <Text style={styles.errorMsg}>{error['title']}</Text>
          )}
        </View>
        <View>
          <Text>Description</Text>
          <TextInput
            name='description'
            style={[styles.textInput, styles.textInput__multiLine]}
            value={this.state.description}
            placeholder='Elaborate more here'
            underlineColorAndroid={this.state.focusedItem === 'description'
              ? color.BLUE_LIGHT 
              : error && error.description
                ? color.APP_BRAND_DARKER
                : color.GREY_LIGHT
            }
            placeholderTextColor={error && error.description
              ? color.APP_BRAND_DARKER
              : null
            }
            multiline={true}
            numberOfLines={4}
            onFocus={() => this.handleFocus('description')}
            onBlur={() => this.handleBlur('description')}
            onSubmitEditing={Keyboard.dismiss}
            onChange={(e) => this.handleValueChange('description', e.nativeEvent.text)}
          />
          {error && error.description && (
            <Text style={styles.errorMsg}>{error.description}</Text>
          )}
        </View>
        <View>
          <Text>Address</Text>
          <TextInput
            name='address'
            placeholder='Enter Address'
            underlineColorAndroid={this.state.focusedItem === 'address'
              ? color.BLUE_LIGHT 
              : error && error.address 
                ? color.APP_BRAND_DARKER
                : color.GREY_LIGHT
            }
            placeholderTextColor={error && error.address
              ? color.APP_BRAND_DARKER
              : null
            }
            onFocus={() => this.handleFocus('address')}
            onBlur={() => this.handleBlur('address')}
            onChange={(e) => this.handleValueChange('address', e.nativeEvent.text)}
          />
          {error && error.address && (
            <Text style={styles.errorMsg}>{error.address}</Text>
          )}
        </View>
        <View>
          <Text>District</Text>
          <TouchableWithoutFeedback onPress={() => this.focusPicker()} >
            <Picker 
              ref={this.picker}
              style={{ marginBottom: -10 }}
              selectedValue={this.state.district}
              onValueChange={(itemValue, itemIndex) =>
                this.handleValueChange('district', itemValue)
              }
            >
              <Picker.Item color={color.GREY_NORMAL} label="Select.." value="" />
              <Picker.Item label="Butwal" value="butwal" />
              <Picker.Item label="Bhairahawa" value="bhairahawa" />
              <Picker.Item label="Kathmandu" value="kathmandu" />
              <Picker.Item label="Narayanghad" value="narayanghad" />
              <Picker.Item label="Chitwan" value="chitwan" />
              <Picker.Item label="Chitwan1" value="chitwan1" />
              <Picker.Item label="Chitwan2" value="chitwan2" />
              <Picker.Item label="Chitwan3" value="chitwan3" />
              <Picker.Item label="Chitwan4" value="chitwan4" />
            </Picker>
          </TouchableWithoutFeedback>
          {error && error.district && (
            <Text style={styles.errorMsg}>{error.district}</Text>
          )}
        </View>
        <View style={styles.isUrgent}>
          <Text>Is Urgent?</Text>
          <View style={styles.isUrgent__switch}>
            <Switch
              value={this.state.isUrgent}
              trackColor={{ true: color.BLUE_LIGHT}}
              thumbColor={color.BG_HIGHLIGHT_LIGHT}
              onValueChange={(value) => { this.setState({ isUrgent: value }) }}
            />
          </View>
        </View>
        <View style={styles.actionBar}>
          {this.state.dataSubmissionStatus === 'ERROR' &&
            this.state.dataSubmissionError && 
            this.renderErrorMessage()
          }
          <View style={styles.actionBtn__container}>
            <TouchableHighlight
              style={[styles.actionBtn, styles.cancelBtn__wrapper]}
              onPress={() => this.handleCancel()}
            >
              <Text style={styles.cancelBtn}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.actionBtn, styles.submitBtn__wrapper]}
              onPress={() => this.handleSubmit() }
            >
              <Text style={styles.submitBtn}>Submit</Text>
            </TouchableHighlight>
            <ActivityIndicator
              style={styles.loadingIndicator}
              size="small"
              animating={this.state.dataSubmissionStatus === 'SAVING'
                ? true : false
              }
              color={color.BLUE_DARK}
            />
          </View>
        </View>
      </View>
    )
  }
  // Render data submission error message
  renderErrorMessage = () => {
    return(
      <View style={styles.errorMessage}>
        <Text style={styles.errorText}>Error Message goes here</Text>
      </View>
      
    )
    
  }
};

export default AddScreen;

const styles = StyleSheet.create({
  addScreen__container:{
    padding: 30
  },
  textInput: {
    height: 40
  },
  textInput__multiLine: {
    maxHeight: 200
  },
  errorMsg: {
    marginTop: -7,
    marginBottom: 7,
    marginLeft: 5,
    color: color.APP_BRAND_DARK
  },
  pickerWrapper: {
    borderBottomWidth: 1, 
    borderBottomColor: color.BLUE_LIGHT
  },
  isUrgent: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  isUrgent__switch: {
    marginRight: 305
  },
  actionBar: {
    marginTop: 80,
  },
  errorMessage: {
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: color.APP_BRAND_DARK,
    backgroundColor: color.APP_BRAND_LIGHTER
  },
  errorText: {
    color: color.APP_BRAND_DARK
  },
  actionBtn__container: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  actionBtn: {
    padding: 5,
    width: 100,
    alignItems: 'center'
  },
  cancelBtn__wrapper: {
    borderWidth: 2,
    borderColor: color.GREY_LIGHT
  },
  cancelBtn: {
    color: color.FONT_COLOR_DARK
  },
  submitBtn__wrapper: {
    backgroundColor: color.APP_BRAND_LIGHT,
    marginLeft: 20
  },
  submitBtn: {
    color: color.BG_WHITE,
    fontSize: font.MEDIUM
  },
  loadingIndicator: {
    marginLeft: -22
  }
})