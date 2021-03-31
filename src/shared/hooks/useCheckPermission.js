/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React, { useCallback, useContext } from 'react';
import { AppContext } from '../../views/auth/hooks/context';

export default function useCheckPermission() {
  const { data } = useContext(AppContext);

  const check = useCallback((permissao) => {
    const permissoes = data?.state?.usuario?.tipo ?? [];

    let possuiPermissao = false;

    if (permissoes == permissao) { possuiPermissao = true; }

    return possuiPermissao;
  }, [data]);

  return [check];
}
