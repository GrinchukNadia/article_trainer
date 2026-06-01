export const validateInput = (username: string, pass:string, passRepeat:string, accepted: boolean) => {
    const usernameOk = username.length >= 2;
    const passOk = pass.length >= 6;
    const same = pass === passRepeat;
    const canSubmit = usernameOk && passOk && same && accepted;
    return Boolean(canSubmit);
}
