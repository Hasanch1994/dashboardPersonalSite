import { msgType } from "./defaultTypes";

export interface loginTypeResponse extends Exclude<msgType, "msg"> {
  _accessToken: string;
  operatorInfo: {
    opId: string;
    opName: string;
  };
}

export type inboxTypeResponse {
  _id: string;
  nameFamily: string;
  emailAddress: string;
  requestType: string;
  message: string;
  date: number;
  visited: boolean;
}

// skills types
export interface skillTypeResponse extends Pick<inboxTypeResponse,"_id"> {
  name: string;
  value: string | number;
}


export interface portfolioTypeResponse extends Pick<inboxTypeResponse,"_id"> {
  title:string,
  description:string,
  date:number | string,
  githubLink:string,
  imageUrls:Array<string>
}

export interface experiencesTypeResponse extends Pick<portfolioTypeResponse,"title" | "_id">{
    from:string,
    to:string,
    text:string,
    status:boolean
}

