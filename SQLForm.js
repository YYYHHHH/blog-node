/**
 * Created by b on 2018/4/12.
 */
module.exports = {
    ArticleSQL:{
        report:'INSERT INTO articlelist (title,content,secret,create_time) VALUES (?,?,?,?)',
        edit:'UPDATE articlelist SET title=?,content=?,secret=?,edit_time=? WHERE art_id =?',
        secret:'UPDATE articlelist SET secret=? WHERE art_id = ?',
        top:'UPDATE articlelist SET top=? WHERE art_id = ?',
        getArticleList:'SELECT * FROM articlelist LIMIT ?,?',
        getArticleById:'SELECT * FROM articlelist WHERE art_id = ?',
        delete:'DELETE FROM articlelist where art_id=?'
    },
    CommentSQL:{
        getComments:'SELECT * FROM comments WHERE art_id = ?',
        getCommentsById:'SELECT * FROM comments WHERE art_id = ? AND comments_id = ?',
    }
};