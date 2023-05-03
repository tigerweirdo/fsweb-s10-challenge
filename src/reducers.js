import { NOT_EKLE, NOT_SIL } from "./actions";

const s10chLocalStorageKey = "s10ch";

const baslangicDegerleri = {
  notlar: [
    {
      id: "75g1IyB8JLehAr0Lr5v3p",
      date: "Fri Feb 03 2023 09:40:27 GMT+0300 (GMT+03:00)",
      body: "Bugün hava çok güzel! En iyi arkadaşımın en iyi arkadaşı olduğumu öğrendim :) Kedim iyileşti!",
    },
  ],
};

const initialState = baslangicNotlariniGetir();

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case NOT_EKLE:
      newState = {
        ...state,
        notlar: [...state.notlar, action.payload],
      };
      localStorageStateYaz(s10chLocalStorageKey, newState);
      return newState;

    case NOT_SIL:
      newState = {
        ...state,
        notlar: state.notlar.filter((not) => not.id !== action.payload),
      };
      localStorageStateYaz(s10chLocalStorageKey, newState);
      return newState;

    default:
      return state;
  }
}


export default reducer;

function localStorageStateYaz(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function localStorageStateOku(key) {
  return JSON.parse(localStorage.getItem(key));
}

function baslangicNotlariniGetir() {
  const eskiNotlar = localStorageStateOku(s10chLocalStorageKey);

  if (eskiNotlar) {
    return eskiNotlar;
  } else {
    localStorageStateYaz(s10chLocalStorageKey, baslangicDegerleri);
    return baslangicDegerleri;
  }
}