import { API_URL} from "../../constants";



export const SET_CURRENT_CHARACTER = 'SET_CURRENT_CHARACTER';
export const SET_CHARACTER_PROFILE = 'SET_CHARACTER_PROFILE';
export const SET_CHARACTER_WORLD = 'SET_CHARACTER_WORLD';
export const SET_CHARACTER_MOVIES ='SET_CHARACTER_MOVIES';


export function setCurrentCharacter(id) {
    return {
        type: SET_CURRENT_CHARACTER,
        id
    };
}

export function getCharacterProfile(id){
    return dispatch =>
        fetch(`${API_URL}/people/${id}`)
            .then(res => res.json())
            .then(profile => {
                dispatch(setCharacterProfile(profile));
                dispatch(getCharacterWorld(profile.homeworld));
                dispatch(getCharacterMovies(profile.films));
            });
}

export function setCharacterProfile(profile){
    return {
        type: SET_CHARACTER_PROFILE,
        profile
    };
}

export function getCharacterWorld(url) {
    return dispatch =>
        fetch(url)
            .then(res => res.json())
            .then(world =>
                dispatch(setCharacterWorld(world))
            );
}

export function setCharacterWorld(world) {
    return {
        type: SET_CHARACTER_WORLD,
        world,
    }
}

export function getCharacterMovies(movieUrls) {
    return dispatch =>
        Promise.all(movieUrls.map(url =>
        fetch(url)
            .then(res => res.json())
            ))
            .then(movies =>
                dispatch(setCharacterMovies(movies))
            )
}
export function setCharacterMovies(movies){
    return {
        type: SET_CHARACTER_MOVIES,
        movies,
    }
}