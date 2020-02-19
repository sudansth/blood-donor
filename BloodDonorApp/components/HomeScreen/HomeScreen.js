import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  Dimensions
} from "react-native";
import color from "../../utils/color";
import { font } from "../../utils/font.js";

const eventList = [
  {
    id: "100",
    title: "Blood Donation Camp1",
    organiser: "Lions club of Butwal",
    location: "Butwal",
    fullAddress: "Lions Club, Pari Butwal, Butwal",
    description: "Calling for all blood donors",
    date: "23-04-2019"
  },
  {
    id: "101",
    title: "A+ Blood required urgently",
    organiser: "Requester Name",
    location: "Bhairahawa",
    fullAddress: "UCMS Hospital, Buddha Path, Bhairahawa",
    description: "Calling for all blood donors",
    date: "24-04-2019"
  },
  {
    id: "102",
    title:
      "Blood Donation Camp2 Long Title To Test the Max length of the title1 title2 title3 title4",
    organiser: "Lions club of Bhairahawa",
    location: "Bhairahawa",
    fullAddress: "UCMS Hospital, Buddha Path, Bhairahawa",
    description: "Calling for all blood donors",
    date: "26-05-2019"
  },
  {
    id: "103",
    title: "Blood Donation Camp1",
    organiser: "Lions club of Butwal",
    location: "Butwal",
    fullAddress: "Lions Club, Pari Butwal, Butwal",
    description: "Calling for all blood donors",
    date: "23-04-2019"
  },
  {
    id: "104",
    title: "Blood Donation Camp2",
    organiser: "Lions club of Saljhandi",
    location: "Saljhandi",
    description: "Calling for all blood donors",
    date: "24-04-2019"
  },
  {
    id: "105",
    title: "Blood Donation Camp3",
    organiser: "Lions club of Bhairahawa",
    location: "Bhairahawa",
    description: "Calling for all blood donors",
    date: "26-05-2019"
  },
  {
    id: "106",
    title: "Blood Donation Camp1",
    organiser: "Lions club of Butwal",
    location: "Butwal",
    description: "Calling for all blood donors",
    date: "23-04-2019"
  },
  {
    id: "107",
    title: "Blood Donation Camp2",
    organiser: "Lions club of Saljhandi",
    location: "Saljhandi",
    description: "Calling for all blood donors",
    date: "24-04-2019"
  },
  {
    id: "108",
    title: "Blood Donation Camp3",
    organiser: "Lions club of Bhairahawa",
    location: "Bhairahawa",
    description: "Calling for all blood donors",
    date: "26-05-2019"
  },
  {
    id: "109",
    title: "Blood Donation Camp1",
    organiser: "Lions club of Butwal",
    location: "Butwal",
    description: "Calling for all blood donors",
    date: "23-04-2019"
  },
  {
    id: "110",
    title: "Blood Donation Camp2",
    organiser: "Lions club of Saljhandi",
    location: "Saljhandi",
    description: "Calling for all blood donors",
    date: "24-04-2019"
  },
  {
    id: "111",
    title: "Blood Donation Camp3",
    organiser: "Lions club of Bhairahawa",
    location: "Bhairahawa",
    description: "Calling for all blood donors",
    date: "26-05-2019"
  },
  {
    id: "112",
    title: "Blood Donation Camp1",
    organiser: "Lions club of Butwal",
    location: "Butwal",
    description: "Calling for all blood donors",
    date: "23-04-2019"
  },
  {
    id: "113",
    title: "Blood Donation Camp2",
    organiser: "Lions club of Saljhandi",
    location: "Saljhandi",
    description: "Calling for all blood donors",
    date: "24-04-2019"
  },
  {
    id: "114",
    title: "Blood Donation Camp3",
    organiser: "Lions club of Bhairahawa",
    location: "Bhairahawa",
    description: "Calling for all blood donors",
    date: "26-05-2019"
  },
  {
    id: "115",
    title: "Blood Donation Camp1",
    organiser: "Lions club of Butwal",
    location: "Butwal",
    description: "Calling for all blood donors",
    date: "23-04-2019"
  },
  {
    id: "116",
    title: "Blood Donation Camp2",
    organiser: "Lions club of Saljhandi",
    location: "Saljhandi",
    description: "Calling for all blood donors",
    date: "24-04-2019"
  },
  {
    id: "117",
    title: "Blood Donation Camp3",
    organiser: "Lions club of Bhairahawa",
    location: "Bhairahawa",
    description: "Calling for all blood donors",
    date: "26-05-2019"
  }
];

// deriving top and left position of the add new button
// respetive to the screen dimension
const BUTTON_POSITION = Dimensions.get("screen").width - 60;
const BUTTON_POSITION_TOP = Dimensions.get("screen").height - 165;

class HomeScreen extends React.Component {
  state = {
    refreshing: false
  };

  // removing default header
  static navigationOptions = {
    header: null
  };

  handleOnPress = itemId => {
    const itemObj = eventList.filter(item => item.id === itemId)[0];
    this.props.navigation.navigate("Details", {
      itemId: itemId,
      item: itemObj
    });
  };

  handleAddNewPress = () => {
    this.props.navigation.navigate("Add");
  };

  // hanldle FlatList refresh
  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        // this.makeRequest();
        console.log("API call");
      }
    );
  };

  // FlatList item Renderer
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.activity_container}
        onPress={() => this.handleOnPress(item.id)}
      >
        <View style={styles.activity__image}>
          <Image
            style={{ width: 50, height: "100%" }}
            source={require("../../../assets/no-image.png")}
          />
        </View>
        <View style={styles.activity__info}>
          <View style={styles.activityHeaderText__wrapper}>
            <Text
              style={styles.activityHeaderText}
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              {" "}
              {item.title}{" "}
            </Text>
          </View>
          <Text> {item.organiser} </Text>
          <View style={styles.activity__info__dateLocationWrapper}>
            <Text> {item.date} </Text>
            <Text> {item.location} </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={{ height: 1, width: "100%", backgroundColor: "#C8C8C8" }} />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: font.LARGE, alignItems: "center" }}>
          Current Activities
        </Text>
        <FlatList
          data={eventList}
          keyExtractor={item => item.id}
          // ItemSeparatorComponent={FlatListItemSeparator}
          renderItem={this.renderItem}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
        <TouchableOpacity
          style={styles.addNewButton__wrapper}
          onPress={this.handleAddNewPress}
        >
          <View style={styles.addNewButton}>
            <Text style={styles.addNewButton__text}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.WHITE,
    justifyContent: "center"
  },
  addNewButton__wrapper: {
    position: "absolute",
    top: BUTTON_POSITION_TOP,
    bottom: 0,
    left: BUTTON_POSITION
  },
  addNewButton: {
    width: 40,
    height: 40,
    borderRadius: 150 / 2,
    backgroundColor: color.APP_BRAND_DARK,
    alignItems: "center"
  },
  addNewButton__text: {
    color: color.BG_WHITE,
    fontSize: font.XXXL,
    top: -9
  },
  activity_container: {
    width: "90%",
    flex: 1,
    flexDirection: "row",
    backgroundColor: color.BG_HIGHLIGHT_LIGHT,
    marginTop: 5,
    marginLeft: 15,
    marginBottom: 5,
    borderRadius: 8,
    elevation: 4
  },
  activity__image: {
    width: "15%"
  },
  activity__info: {
    width: "85%",
    marginLeft: 10,
    paddingBottom: 5
  },
  activityHeaderText__wrapper: {
    width: "95%"
  },
  activityHeaderText: {
    fontSize: font.LARGE,
    color: color.FONT_COLOR_DARK,
    fontWeight: "bold"
  },
  activity__info__dateLocationWrapper: {
    width: "95%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
