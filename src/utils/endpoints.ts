
export const ENDPOINTS = {
  login :'/user/login',
  me:'/user/me',
  logout:'/logout'
};

export const ENDPOINTS_CLIENT = {
  admin: {
    ordTrabAll : '/user/admin/ordenes-trabajo/all',
    ordTrabEq : '/user/admin/ordenes-trabajo/equipos',
    ordTrabPer: '/user/admin/ordenes-trabajo/personas',
    ordTrabReportes: '/user/admin/ordenes-trabajo/reportes',
    ordTrabImformenes: '/user/admin/ordenes-trabajo/informenes',

    ordTrabEmpresas: '/user/admin/datos/empresas',
    ordTrabAreas: '/user/admin/datos/areas',
    ordTrabCertificadores: '/user/admin/datos/certificadores',
  }
}

