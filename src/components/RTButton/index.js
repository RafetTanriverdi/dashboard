import AddButton from "./AddButton/AddButton";
import AuthAddButton from "./AuthAddButton/AuthAddButton";
import AuthReloadButton from "./AuthReloadButton/AuthReloadButton";
import BasicButton from "./BasicButton/BasicButton";
import LinkButton from "./LinkButton/LinkButton";
import PrimaryButton from "./PrimaryButton/PrimaryButton";
import Reloadbutton from "./ReloadButton/ReloadButton";

export const RTButton = {};
RTButton.login = PrimaryButton;
RTButton.register = LinkButton;
RTButton.add = AddButton;
RTButton.authAdd = AuthAddButton;
RTButton.basic = BasicButton;
RTButton.reload = Reloadbutton;
RTButton.authReload = AuthReloadButton;
