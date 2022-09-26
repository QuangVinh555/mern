const Post = require('../models/Post');

class PostController{
    // [POST] /api/post/create
    async create(req, res) {
        const {title, description, url, status} = req.body;

        // simple validation
        if(!title)
            return res.status(400).json({success: false, message: 'Title is required'});
        
        try {
            const newPost = new Post({
                title, 
                description, 
                url: (url.startsWith('https://')) ? url : `https://${url}`, 
                status: status || 'TO LEARN',
                user: req.userId
            })

            await newPost.save();

            res.json({success: true, message: 'Happened successfully', post: newPost});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

    // [GET] /api/post/get
    async get(req, res) {
        try {
            const posts = await Post.find({ user: req.userId }).populate('')
            res.json({success: true, posts})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

    // [PUT] /api/post/:id
    async update(req, res) {
        const {title, description, url, status} = req.body;
        
        // simple validation
        if(!title)
            return res.status(400).json({success: false, message: 'Title is required'});
        
        try {
            let updatePost = {
                title,
                description: description || '',
                url: (url.startsWith('https://') ? url : `https://${url}`) || '', 
                status: status || 'TO LEARN',
            }

            const postUpdateCondition = {_id: req.params.id, user: req.userId}
            updatePost = await Post.findByIdAndUpdate(postUpdateCondition, updatePost, {new: true});

            // Nếu chưa cập nhật thành công
            if(!updatePost){
                return res.status(404).json({success: false, message: 'Post not found or user not authorised'});            
            }

            // thành công
            res.json({success: true, message: 'Excellent progress!', post: updatePost});

        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

    // [DELETE] /api/post/:id
    async delete(req, res) {
        try {
            const postDeleteCondition = {_id: req.params.id, user: req.userId}
            const deletePost = await Post.findOneAndDelete(postDeleteCondition)    

            // Nếu chưa xóa thành công
            if(!deletePost){
                return res.status(404).json({success: false, message: 'Post not found or user not authorised'});            
            }

            // thành công
            res.json({success: true, message: 'Excellent progress!', post: deletePost});

        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }
}

module.exports = new PostController;