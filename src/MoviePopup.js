import React from "react";
import {
  Animated,
  Dimensions,
  Image,
  LayoutAnimation,
  PanResponder,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  View,
  document
} from "react-native";
import SwipeUpDown from "react-native-swipe-up-down";
import { movies } from "./data";
import { defaultStyles } from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";

const days = movies.map(movie => movie.days);
days.length = 1;
var dayArray = days[0];

const times = movies.map(movie => movie.times);
times.length = 1;
var timeArray = times[0];

const { width, height } = Dimensions.get("window");
// Set default popup height to 67% of screen height
const defaultHeight = height * 0.67;
const imageHeight = height / 1.5 / 3;
const textHeight = imageHeight / 2;

const defaultCol = "black",
  selectedCol = "white";
//global.background = background;
const defaultBack = "white",
  selectedBack = "black";

export default class MoviePop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: new Animated.Value(this.props.isOpen ? 0 : height),
      movieName: props.movieName,
      movieGenre: props.movieGenre,
      moviePoster: props.moviePoster,
      days: props.days,
      times: props.times,
      //height: height / 2,
      visible: this.props.isOpen,
      buttonOne: false,
      background: "white",
      isChosen: props.isChosen,
      dayState: props.dayState,
      timeChosen: props.timeChosen,
      timeState: props.timeState
    };
    this.animateOpen = this.animateOpen.bind(this);
    this.animateClose = this.animateClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // isOpen prop changed to true from false
    if (!this.props.isOpen && nextProps.isOpen) {
      this.animateOpen();
    }
    // isOpen prop changed to false from true
    if (this.props.isOpen && !nextProps.isOpen) {
      this.animateClose();
    }
    if (this.state.movieName !== nextProps.movieName) {
      this.setState({ movieName: nextProps.movieName });
    }
    if (this.state.movieGenre !== nextProps.movieGenre) {
      this.setState({ movieGenre: nextProps.movieGenre });
    }
    if (this.state.moviePoster !== nextProps.moviePoster) {
      this.setState({ moviePoster: nextProps.moviePoster });
    }
    if (this.state.days !== nextProps.days) {
      this.setState({ days: nextProps.days });
    }
    if (this.state.times !== nextProps.times) {
      this.setState({ times: nextProps.times });
    }
    if (this.state.isChosen !== nextProps.isChosen) {
      this.setState({ isChosen: nextProps.isChosen });
    }
    if (this.state.dayState !== nextProps.dayState) {
      this.setState({ dayState: nextProps.dayState });
    }
    if (this.state.timeChosen !== nextProps.timeChosen) {
      this.setState({ timeChosen: nextProps.timeChosen });
    }
    if (this.state.timeState !== nextProps.timeState) {
      this.setState({ timeState: nextProps.timeState });
    }
  }

  animateOpen() {
    // Update state first
    this.setState({ visible: true }, () => {
      // And slide up
      Animated.timing(
        this.state.position,
        { toValue: 0 } // top of the screen
      ).start();
    });
  }

  // Close popup
  animateClose() {
    // Slide down
    Animated.timing(
      this.state.position,
      { toValue: height } // bottom of the screen
    ).start(() => this.setState({ visible: false }));
  }

  render() {
    //console.log(timeArray);
    //console.log(dayString);
    //console.log(this.state.movieName.length);
    //console.log(background);
    if (!this.state.visible) {
      return null;
    } else {
      return (
        //   <SwipeUpDown
        //     //style={styles.modal}
        //     //itemMini={<ItemMini />} // Pass props component when collapsed
        //     //itemFull={<ItemFull />} // Pass props component when show full
        //     onShowMini={() => console.log("mini")}
        //     onShowFull={() => console.log("full")}
        //     onMoveDown={() => console.log("down")}
        //     onMoveUp={() => console.log("up")}
        //     disablePressToShow={false} // Press item mini to show full
        //     style={{ backgroundColor: "green" }}
        //     itemFull={

        //     }
        //   />
        <View style={styles.container}>
          {/* Closes popup if user taps on semi-transparent backdrop */}
          <TouchableWithoutFeedback onPress={this.props.onClose}>
            <Animated.View style={styles.backdrop} />
          </TouchableWithoutFeedback>

          <GestureRecognizer
            onSwipeDown={() => {
              //this.animateClose();
              //this.setState({ visible: false });
              this.props.onClose();
              Animated.timing(
                this.state.position,
                { toValue: height } // bottom of the screen
              ).start();
            }}
          >
            <Animated.View
              style={[
                styles.modal,
                {
                  // Animates position on the screen
                  transform: [
                    { translateY: this.state.position },
                    { translateX: 0 }
                  ]
                }
              ]}
            >
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Image
                  source={{ uri: this.state.moviePoster }}
                  style={{
                    height: imageHeight,
                    width: width / 3,
                    borderRadius: 10
                  }}
                />

                <View
                  style={{
                    flexDirection: "column",
                    flexWrap: "wrap",
                    alignItems: "center",
                    //backgroundColor: "black",
                    height: imageHeight,
                    flex: 1,
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "Avenir Next",
                      fontWeight: "300",
                      textAlign: "center"
                    }}
                  >
                    {this.state.movieName}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Avenir Next",
                      fontWeight: "200",
                      fontSize: 15
                    }}
                  >
                    {this.state.movieGenre}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  flexWrap: "wrap",
                  paddingTop: 10
                }}
              >
                <Text style={{ fontFamily: "Avenir Next", fontSize: 20 }}>
                  Days
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    paddingTop: 10,
                    justifyContent: "flex-start"
                  }}
                >
                  {dayArray.map((day, index) => (
                    <TouchableOpacity
                      style={{
                        borderWidth: 0.5,
                        marginRight: 10,
                        borderRadius: 7.5,
                        width: 100,
                        height: 30,
                        textAlign: "center",
                        position: "relative",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor:
                          this.state.isChosen === index &&
                          day === this.state.dayState
                            ? selectedBack
                            : defaultBack
                      }}
                      //style={{ backgroundColor: background }}
                      //isChosen={index === chosen}
                      onPress={() =>
                        this.setState({ dayState: day, isChosen: index })
                      }
                    >
                      <Text
                        style={{
                          color:
                            this.state.isChosen === index &&
                            day === this.state.dayState
                              ? selectedCol
                              : defaultCol
                        }}
                      >
                        {day}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text
                  style={{
                    fontFamily: "Avenir Next",
                    fontSize: 20,
                    paddingTop: 10
                  }}
                >
                  Times
                </Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  //style={{ backgroundColor: "red" }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "nowrap",
                      paddingTop: 10,
                      justifyContent: "flex-start"
                    }}
                  >
                    {timeArray.map((time, index) => (
                      <TouchableOpacity
                        style={{
                          borderWidth: 0.5,
                          marginRight: 10,
                          borderRadius: 7.5,
                          width: 100,
                          height: 30,
                          textAlign: "center",
                          position: "relative",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor:
                            this.state.timeChosen === index &&
                            time === this.state.timeState
                              ? selectedBack
                              : defaultBack
                        }}
                        //style={{ backgroundColor: background }}
                        //isChosen={index === chosen}
                        onPress={() =>
                          this.setState({ timeState: time, timeChosen: index })
                        }
                      >
                        <Text
                          style={{
                            color:
                              this.state.timeChosen === index &&
                              time === this.state.timeState
                                ? selectedCol
                                : defaultCol
                          }}
                        >
                          {time}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>

                <TouchableOpacity
                  style={{
                    height: 50,
                    width: 175,
                    borderWidth: 0.5,
                    borderRadius: 7.5,
                    textAlign: "center",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "25%",
                    marginTop: 20,
                    backgroundColor: "#4169e1",
                    borderColor: "#4169e1"
                  }}
                  onPress={() => {
                    if (
                      this.state.isChosen !== null &&
                      this.state.dayState !== "what" &&
                      this.state.timeChosen !== null &&
                      this.state.timeState !== "what"
                    ) {
                      this.props.switchPages();
                      this.props.onClose();
                    } else {
                      null;
                    }
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Avenir Next",
                      fontSize: 20,
                      color: "white"
                    }}
                  >
                    Book Tickets
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </GestureRecognizer>
          {/* </SwipeUpDown> */}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  // Main container
  container: {
    ...StyleSheet.absoluteFillObject, // fill up all screen
    justifyContent: "flex-end", // align popup at the bottom
    backgroundColor: "transparent" // transparent background
  },
  // Semi-transparent background below popup
  backdrop: {
    ...StyleSheet.absoluteFillObject, // fill up all screen
    backgroundColor: "black",
    opacity: 0.5
  },
  // Popup
  modal: {
    height: height / 1.75, // take half of screen height
    backgroundColor: "white",
    flexDirection: "column",
    flexWrap: "wrap",
    paddingLeft: 10,
    paddingTop: 10
  },
  imageContainer: {
    //flex: 0.5 // take up all available space
  },
  image: {
    borderRadius: 10, // rounded corners
    ...StyleSheet.absoluteFillObject // fill up all space in a container
  }
});
