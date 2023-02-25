import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { apolloClient } from "./graphql/client";
import ThemeProvider from "./providers/theme";
import { store } from "./redux/store";
import { AppRoutes } from "./routes";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ApolloProvider  client={apolloClient}>
        <ThemeProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ThemeProvider>
        </ApolloProvider>
      </Provider>
    </div>
  );
}

export default App;
