const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateExperianceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy: "";


if(validator.isEmpty(data.title)){
    errors.title ='job title cannot be left empty';
}
if(validator.isEmpty(data.degree)){
    errors.degree ='comnpany field is reqd';
    }
if(validator.isEmpty(data.fieldofstudy)){
   errors.fieldofstudy = 'fieldofstudy field is reqd'
}

return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = function validateProfileInput(data) {
    let errors = {};
  
    data.handle = !isEmpty(data.handle) ? data.handle : "";
    data.status = !isEmpty(data.status) ? data.status : "";
    data.skills = !isEmpty(data.skills) ? data.skills: "";
  
    if(!validator.isLength(data.handle, {min:2 ,max:40})){
        errors.handle ='handle need to have a length of 2 to 40 characters';
    }
    if(validator.isEmpty(data.handle)){
      errors.handle ='handle cannot be left empty';
  }
  if(validator.isEmpty(data.status)){
      errors.status ='status cannot be left empty';
  }
  if(validator.isEmpty(data.skills)){
      errors.skills ='skills cannot be left empty';
  }
  if(!validator.isEmpty(data.facebook)){
      if(!validator.isURL(data.facebook)){
      errors.facebook ='not a valid URL';
      }
  }
  if(!validator.isEmpty(data.twitter)){
      if(!validator.isURL(data.twitter)){
      errors.twitter ='not a valid URL';
      }
  }
  if(!validator.isEmpty(data.instagram)){
    if(!validator.isURL(data.instagram)){
    errors.instagram ='not a valid URL';
    }
}
if(!validator.isEmpty(data.youtube)){
    if(!validator.isURL(data.youtube)){
    errors.youtube ='not a valid URL';
    }
}
  if(!validator.isEmpty(data.instagram)){
      if(!validator.isURL(data.instagram)){
      errors.instagram ='not a valid URL';
      }
  }
  if(!validator.isEmpty(data.linkdin)){
      if(!validator.isURL(data.linkdin)){
      errors.linkdin='not a valid URL';
      }
  }
  
  return {
      errors,
      isValid: isEmpty(errors)
    };
  };
  module.exports = function validateEducationInput(data) {
    let errors = {};
  
    data.school = !isEmpty(data.school) ? data.school : "";
    data.degree = !isEmpty(data.degree) ? data.degree : "";
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy: "";
    data.from = !isEmpty(data.from) ? data.from: "";
  
  
  if(validator.isEmpty(data.school)){
      errors.school ='school name cannot be left empty';
  }
  if(validator.isEmpty(data.degree)){
      errors.degree ='comnpany field is reqd';
      }
  if(validator.isEmpty(data.fieldofstudy)){
     errors.fieldofstudy = 'fieldofstudy field is reqd'
  }
  if(validator.isEmpty(data.from)){
    errors.from = 'from field is reqd'
 }
 
  return {
      errors,
      isValid: isEmpty(errors)
    };
  };