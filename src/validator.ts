/* password must to be more than 8 and lest than 30 characters
characters and contains number 
and alphabets and special characters
*/
export const passwordChecker = (input: string) => {
  // Assert a string has at least one number and one special character
  const regExp = "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$";

  if (new RegExp(regExp).test(input)) return true;
  else return false;
};

/*
userName must to be more than 5 character and less than 20 contains alphabets and number
*/
export const userNameChecker = (input: string) => {
  const regExp = "^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{5,20}$";

  if (new RegExp(regExp).test(input)) return true;
  else return false;
};



