import {UpdateAbonneeAccount} from "../../usecases/UpdateAbonneeAccount";
import {MockAbonneeAccountRepository} from "./MockAbonneeAccountRepository";

export function MockUpdateAbonneeAcount(): UpdateAbonneeAccount {
  return new UpdateAbonneeAccount(MockAbonneeAccountRepository())
}
