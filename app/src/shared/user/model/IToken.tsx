export interface IToken {
    access_token : string;
    expires : number;
    token_type : TokenType;
}

enum TokenType {
    "Bearer"
}