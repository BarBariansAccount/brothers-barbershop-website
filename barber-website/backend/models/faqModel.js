const getFAQ = "SELECT faq.faqid, faq.question, faq.answer FROM faq";

const addFAQ = "INSERT INTO faq (question, answer) VALUES ($1, $2)";

const updateFAQ = "UPDATE faq SET question = $2, answer = $3 WHERE faqid=$1";

const deleteFAQ = "DELETE FROM faq WHERE faqid=$1";

const checkFAQExists = "SELECT faq.faqid, faq.question, faq.answer FROM faq WHERE faq.faqid=$1";



module.exports = {
    getFAQ,
    addFAQ,
    updateFAQ,
    deleteFAQ,
    checkFAQExists
}
