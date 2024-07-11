## description

GOTO [Backend](https://github.com/BusinessTable/183_backend/blob/main/README.md) to see Frontend implementation

frontend for a password manager written in react js.

included pages:

- /signin
- /signup
- /dashboard

## important Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Reflexion 30.05.2024

im front end konnten wir heute leider nicht viel machen, da hauptsächlich die verbindung zum backend fehlt.

sobald wir keine probleme, mit dem backend haben, fählt praktisch nur noch die authentisierung der routes und die visualisierung der daten.

## Reflexion 06.06.2024

Wir konnten die Fehler des Backends lösen. Jetzt fehlt nur noch, die Endpoints zu verbinden.

## Reflexion 27.06.2024

Heute hatten wir ein wenig Probleme mit dem Paging, konnten dies aber lösen. Dazu haben wir uns Gedanken gemacht wie wir unser Projekt weiter führen werden.

Beziehungsweise, haben wir uns Gedanken gemacht arüber, was wir noch umsetzen müssen oder besser gesagt noch wollen.

Bei unserem jetzigen Fortschritt haben wir grundsätzlich gute Voraussetzungen um unser Frontend weiter auszubauen.

Wir haben, da unser momentaner Code fehler wirft diesen noch nicht commitet, falls jemand unser Projekt klonen möchte.

Diese Probleme werden wir nächste Woche lösen.

Wir sind trotzdem sehr Stolz auf unseren momentan Fortschritt und sind sehr zuversichtlich.

# Functional Programmning

## Pure functions

Pure Functions gegen ohne Nebeneffekte imer das gleiche resultat zurüch gegeben, man gibt den gleichen Input mit.

    const encryptPassword = (password, key) => {
        return CryptoJS.AES.encrypt(JSON.stringify(password), key).toString();
    };

    const decryptPassword = (password, key) => {
        return JSON.parse(
            CryptoJS.AES.decrypt(password, key).toString(CryptoJS.enc.Utf8)
        );
    };

## Higher-Order Functions

Higher-Order Functions nehmen eine oder mehrere function in sich mit.

    useEffect(() => {
        fetchPasswords();
        fetchRubrics();
    }, [authed, page, refreshFlag]);

## Array Methods

Array Methoden wie zum Beispiel map sind High-Order Functions

    const passwords = response.data.passwords.map((password) => ({
        password: decryptPassword(password.data, encryptionKey),
        uuid: password.uuid,
    }));

## Promises ans Async/Await

Unsere fetchPasswords und fetchRubrics methoden sind in einem Fukntionalen Style geschrieben.

    const fetchPasswords = () => {
        getPasswordsPage(authed, page).then((data) => {
            setRows(data.passwords);
            setPageNumbers(data.totalPages);
        });
    };

    const fetchRubrics = () => {
        getRubriks(authed).then((data) => {
            setRubrics(data);
        });
    };

GOTO [Backend](https://github.com/BusinessTable/183_backend/blob/main/README.md) to see Frontend implementation
