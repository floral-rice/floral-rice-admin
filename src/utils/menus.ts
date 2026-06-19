import { Menu } from '@/typing/index';

/**
 * 检查是否有权限
 * @param authority 菜单要求的权限
 * @param authorities 用户拥有的权限列表
 */
const hasAuthority = (authority: string | string[], authorities: string[]): boolean => {
  if (Array.isArray(authority)) {
    return authority.some(item => authorities.includes(item));
  }
  return authorities.includes(authority);
};

/**
 * 根据权限过滤菜单树
 * @param menus 菜单树
 * @param authorities 用户权限列表
 * @returns 过滤后的菜单树
 */
export const filterMenusByAuthority = (menus: Menu[], authorities: string[]): Menu[] => {
  return menus
    .map(menu => {
      // 如果有子菜单，递归过滤
      if (menu.children?.length) {
        const children = filterMenusByAuthority(menu.children, authorities);
        return { ...menu, children };
      }
      return { ...menu };
    })
    .filter(menu => {
      // 如果有authority字段，判断是否有权限
      if (menu.authority) {
        return hasAuthority(menu.authority, authorities);
      }
      return true;
    })
    .filter(menu => {
      // 删除children为空数组的节点
      if (menu.children && menu.children.length === 0) {
        return false;
      }
      return true;
    });
};
