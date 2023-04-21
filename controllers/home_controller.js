
const user = require('../models/users')
//const user = require('../models/users')

module.exports.home = async (req, res) => {
    // console.log(req.cookies);
    // post.find({}, (err, posts) => {
    //     return res.render("home", { posts: posts })
    // })

    // const posts = await post.find({}).populate('user');
    // return res.render("home", { posts: posts })

    try {
       
        let users = await user.find({});
        return res.render("home", {  all_users: users })

    } catch (error) {
        console.log('error occured in homecontroller', error);
        return;
    }

}