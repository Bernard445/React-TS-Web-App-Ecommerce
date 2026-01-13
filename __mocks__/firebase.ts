export const initializeApp = jest.fn();

export const getAuth = jest.fn(() => ({
  currentUser: null,
  // add any fake methods if needed later, e.g. signInWithEmailAndPassword: jest.fn()
}));

export const getFirestore = jest.fn(() => ({}));
