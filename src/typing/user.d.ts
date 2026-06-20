export type Gender = "unknown" | "male" | "female";

export interface User {
   /**
     * 登录账号
     */
   account?: string;
   /**
    * 头像URL
    */
   avatar?: string;
   /**
    * 创建时间
    */
   created_at?: string;
   /**
    * 性别（unknown/male/female）
    */
   gender?: Gender;
   /**
    * 主键ID
    */
   id?: number;
   /**
    * 权限列表（非数据库字段，由服务层根据角色填充）
    */
   permissions?: AuthPermission[];
   /**
    * 关联角色列表
    */
   roles?: Role[];
   /**
    * 状态（1正常/0禁用）
    */
   status?: number;
   /**
    * 更新时间
    */
   updated_at?: string;
   /**
    * 昵称/用户名
    */
   user_name?: string;
}

export interface AuthPermission {
  /**
   * 创建时间
   */
  created_at: string;
  /**
   * 权限ID
   */
  id: number;
  /**
   * 权限名称（规则：用户-用户管理-查询）
   */
  name: string;
  /**
   * 权限路径（规则：用户/用户管理/查询）
   */
  path: string;
}

export interface Role {
  /**
   * 角色编码（唯一）
   */
  code?: string;
  /**
   * 创建时间
   */
  created_at?: string;
  /**
   * 角色描述
   */
  description?: string;
  /**
   * 角色ID
   */
  id?: number;
  /**
   * 角色名称
   */
  name?: string;
  /**
   * 关联权限列表
   */
  permissions?: AuthPermission[];
  /**
   * 状态（1启用/0禁用）
   */
  status?: number;
  /**
   * 更新时间
   */
  updated_at?: string;
}
