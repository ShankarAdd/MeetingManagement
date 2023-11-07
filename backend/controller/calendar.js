const Calendar = require('../model/calendar');

exports.postCal = (req,res,next) =>{
    const {name, email, googleMeetLink, selectedSlot} = req.body;
    Calendar.create({
        name: name,
        email: email,
        googleMeetLink: googleMeetLink,
        selectedSlot: selectedSlot
    })
    .then(result =>{
        res.json(result);
    })
    .catch(err => console.log(err));
}
exports.getCal = (req,res,next) =>{
    Calendar.findAll()
    .then(result =>{
        res.json(result);
    })
    .catch(err => console.log(err));
}
exports.deleteCal = (req,res,next) =>{
    const id=req.params.id;
    Calendar.destroy({
      where: 
      {
        id:id
      }
    })
    .then(deleteUser =>{
      res.json(deleteUser)
    })
    .catch(err =>console.log(err));
}