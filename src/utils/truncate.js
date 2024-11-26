export const truncateStr=(str, maxLength = 20)=> {
    if (!str) return ""; 
    if (str.length <= maxLength) return str; 
    return str.slice(0, maxLength) + "..."; 
  }
