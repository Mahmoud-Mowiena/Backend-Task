
export default {
  name: {
    isEmpty: false,
  },
  released_at: {
    isEmpty: false,
    isDate: true,
  },
  cast: {
    isEmpty: false,
    length: true,
  },
  category: {
    isEmpty: false,
    exists: "category:_id" 
  },
};
