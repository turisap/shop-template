 const PERMISSIONS = {
    ADMIN : 'ADMIN',
    USER  : 'USER',
    PERMISSIONSUPDATE : 'PERMISSIONSUPDATE',
    ITEMDELETE : 'ITEMDELETE',
    ITEMUPDATE : 'ITEMUPDATE',
    ITEMCREATE : 'ITEMCREATE',
};

const ALLOWED_DELETE_ITEMS = [PERMISSIONS.ADMIN, PERMISSIONS.ITEMDELETE];

exports.PERMISSIONS = PERMISSIONS;
exports.ALLOWED_DELETE_ITEMS = ALLOWED_DELETE_ITEMS;