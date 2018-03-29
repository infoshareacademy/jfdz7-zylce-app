import firebase from 'firebase'


const SET_USER = 'auth/SET_USER'

export const setUser = user => ({
    type: SET_USER,
    user
})


export const signIn = (email, password) => dispatch => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
}

export const signUp = (email, password, firstName, lastName) => dispatch => {
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password,)
        .then(user => {
            firebase
                .database()
                .ref('/users/' + user.uid)
                .set({
                    role: 'user',
                    firstName: firstName,
                    lastName: lastName,
                    events: {},


                })
        })
}
export const signOut = () => dispatch => {
    firebase.auth().signOut()
}


const initialState = {
    user: null
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user
            }
        default:
            return state
    }
}