declare module 'apollo-upload-client/UploadHttpLink.mjs' {
  import { ApolloLink } from '@apollo/client';

  interface UploadHttpLinkOptions {
    uri?: string;
    useGETForQueries?: boolean;
    credentials?: string;
    headers?: Record<string, string>;
    fetch?: typeof fetch;
    [key: string]: any;
  }

  export default class UploadHttpLink extends ApolloLink {
    constructor(options?: UploadHttpLinkOptions);
  }
}
