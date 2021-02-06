import React from "react";
// import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import GlobalStyle from "./styles/global";

const App: React.FC = () => {
  return (
    <div>
      <SignUp />
      <GlobalStyle />
    </div>
  );
};

export default App;
