import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {Provider} from "react-redux";
import {persistor, store} from "./store";
import {PersistGate} from "redux-persist/integration/react";
import {QueryClient, QueryClientConfig, QueryClientProvider} from "@tanstack/react-query";
import {setHeaderAuthorization} from "./utils/HttpClient";
import {BrowserRouter} from "react-router-dom";
import './index.scss';
import './utils/i18Next';
import 'flowbite';
import 'react-toastify/dist/ReactToastify.css';

const config: QueryClientConfig = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            // refetchOnMount: true,
            retry: false,
            staleTime: 60 * 1000,
            cacheTime: 0
        },
    }
}

const queryClient = new QueryClient(config)

const handleOnBeforeLift = () => {
    if (store.getState().auth.isLogged) {
        setHeaderAuthorization(store.getState().auth.accessToken)
    }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} onBeforeLift={handleOnBeforeLift}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </QueryClientProvider>
        </PersistGate>
    </Provider>
)
