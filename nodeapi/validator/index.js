exports.createPostValidator = (req,res,next) => {
  //title
  req.check('title',"Write a Title").notEmpty();
  req.check('title',"Title must between 4-150 characters").isLength({
    min:4,
    max:150
  });

  //body
  req.check('title',"Write a Body").notEmpty()
  req.check('title',"Body must between 4-2000 characters").isLength({
    min:4,
    max:2000
  });

  //check validationErrors
  const errors = req.validationErrors();
  //if errors show it happen
  if(errors) {
    const firstError = errors.map((error) => error.msg)[0]
    return res.status(400).json({error: firstError})
  }
//proceed to next middleware
next();
};

exports.userSignupValidator = (req, res, next) => {

    //name is not null and between 4-10 characters
    req.check("name", "Name is required").notEmpty();

    //email is not null, valid and normalized
    req.check("email", "Email must be between 3-32 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 2000
        })

    //check for password
    req.check("password", "Password is required").notEmpty();
    req.check('password')
        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password Must Contain a number")

    //check for errors
    const error = req.validationErrors();

    //if error show the first one as they happen
    if (error) {
        const firstError = error.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });

    }
    //proceed to next middleware to the code
    next();

};
