import { View, Text } from "react-native-web";

const AuthLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <View>
      <Text>Auth layout</Text>
    </View>
  );
};

export default AuthLayout;
