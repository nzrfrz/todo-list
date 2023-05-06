import { QueryClientProvider } from "@tanstack/react-query";

import { NotifContextProvider } from "./Context/NotifContext";
import { MessageContextProvider } from "./Context/MessageContext";
import { GlobalContextProvider } from "./Context/GlobalContext";
import { queryClientInstance } from "./_services";

import { MainRoutes } from "./Routes";

function App() {

  return (
    // <QueryClientProvider client={queryClientInstance}>
    <MessageContextProvider>
      <NotifContextProvider>
        {/* <GlobalContextProvider> */}
          <MainRoutes />
        {/* </GlobalContextProvider> */}
      </NotifContextProvider>
    </MessageContextProvider>
    // </QueryClientProvider>
  )
}

export default App;
