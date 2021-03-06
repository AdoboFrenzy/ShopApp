import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { addToCart } from "../../store/actions/cart";

import Colors from "../../constants/Colors";

const ProductDetailScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = props.navigation.getParam("product");

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          title="Add to Cart"
          color={Colors.primary}
          onPress={() => {
            dispatch(addToCart(selectedProduct));
          }}
        />
      </View>

      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (navData) => {
  const selectedProduct = navData.navigation.getParam("product");

  return {
    headerTitle: selectedProduct.title,
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
  // test: {
  //   flexDirection: "row",
  //   width: "50%",
  //   height: 50,
  //   backgroundColor: "red",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // testText: {
  //   fontSize: 24,
  // },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
    fontFamily: "open-sans",
  },
});

export default ProductDetailScreen;
