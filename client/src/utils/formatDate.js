const formatDate = (date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    const newDate = new Date(date);
    const min = newDate.getMinutes();
    const hour = newDate.getHours();
    const day = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();

    return `${hour}:${min} || ${day} ${months[month]}, ${year}`;
};

export default formatDate;