import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageCutomerService {

  constructor() { }


//Stocker les valeurs
async store(storageKey: string, value: any) {
  const encryptedValue = btoa(escape(JSON.stringify(value)));
  await Storage.set({
  key: storageKey,
  value: encryptedValue
  });
  }
  
  //Récupérer les valeurs
  async get(storageKey: string) {
  const ret = await Storage.get({ key: storageKey });
  return JSON.parse(unescape(atob(ret.value)));
  }
  
  //Supprimer la clé
  async removeStorageItem(storageKey: string) {
  await Storage.remove({ key: storageKey });
  }
  
  //Supprimer le storage
  async clear() {
  await Storage.clear();
  }
}
