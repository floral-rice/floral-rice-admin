import { ref, onMounted, onUnmounted, watch } from "vue";
import { ElMessage, ElLoading } from "element-plus";
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RequestFn<T = any, P extends any[] = any[]> = (...args: P) => Promise<T> | T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface UseRequestOptions<T, P extends any[]> {
  /** loading状态变化监听函数 */
  onLoading?: (loading: boolean) => void;
  /** 成功回调
   * @param res request返回的数据
   * @param params request的参数
   */
  onSuccess?: (res: T, params: P) => void;
  /**
   * 错误回调
   * @param err 异常，抛出异常的时候务必是Error的实例
   * @param params request的参数
   * @param showError 调用全局的错误信息提示
   * @returns
   */
  onError?: (err: Error, params: P, showError: () => void) => void;
  /** 最终回调 */
  onFinally?: () => void;
  /** 节流模式的时间 */
  throttleInterval?: number;
  /** 防抖模式的时间 */
  debounceInterval?: number;
  /** 启用loading状态 */
  loadingState?: boolean;
  /** 是否展示加载中的toast toast可以自定义 */
  toast?: boolean;
  /** 是否需要手动执行 默认 true，非手动模式默认会返回request返回的数据，data */
  manual?: boolean;
  /** 自动模式data的默认值，否则就是null */
  defaultData?: T;
  /** 非手动模式自动刷新的依赖项 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refreshDeps?: any[];
  /** 在上一次未完成之前，防止重复调用 */
  lock?: boolean;
}

/**
 * 发起网络请求, 主要面向场景: 提交单据、点击列表打开详情页前请求数据，自动捕获异常
 * @param request 网络请求方法
 * @param options 参数
 * @returns
 */
export function useRequest<
  T = any,
  P extends any[] = any[],
>(request: RequestFn<T, P>, options: UseRequestOptions<T, P> = {}) {
  const {
    onSuccess,
    onError,
    onFinally,
    onLoading,
    throttleInterval = 0,
    debounceInterval = 0,
    loadingState = true,
    toast = false,
    manual = true,
    defaultData = null as any,
    refreshDeps = [],
    lock = false,
  } = options;

  const loading = ref(false);
  const data = ref<T>(defaultData);
  const mounted = ref(false);
  const fetchId = ref(0);
  const lockRef = ref(false);
  let loadingInstance: any = null;

  /** 开始 */
  const start = () => {
    if (toast && !loadingInstance) {
      loadingInstance = ElLoading.service({
        lock: true,
        text: "加载中...",
      });
    }

    if (loadingState) {
      loading.value = true;
    }

    onLoading?.(true);
  };

  /** 结束 */
  const end = () => {
    if (loadingInstance) {
      loadingInstance.close();
      loadingInstance = null;
    }

    if (!mounted.value) return;

    if (loadingState) {
      loading.value = false;
    }

    onLoading?.(false);
  };

  /** 核心执行 */
  const _run = async (...args: P) => {
    if (lockRef.value) return;

    if (lock) {
      lockRef.value = true;
    }

    fetchId.value++;
    const currentId = fetchId.value;

    start();

    try {
      const res = await request(...args);

      if (mounted.value && currentId === fetchId.value) {
        end();
        onSuccess?.(res, args);

        if (!manual) {
          data.value = res;
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      end();

      const showError = () => {
        ElMessage.error(err?.message || "请求错误");
      };

      if (onError) {
        onError(err, args, showError);
      } else {
        showError();
      }
    } finally {
      onFinally?.();
      lockRef.value = false;
    }
  };

  /** 防抖 / 节流包装 */
  let run: (...args: P) => void;

  if (debounceInterval) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    run = debounce(_run, debounceInterval);
  } else if (throttleInterval) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    run = throttle(_run, throttleInterval, { trailing: false });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    run = _run;
  }

  /** 自动执行 */
  if (!manual) {
    watch(
      refreshDeps,
      () => {
        void _run(...([] as unknown as P));
      },
      { immediate: true },
    );
  }

  onMounted(() => {
    mounted.value = true;
  });

  onUnmounted(() => {
    mounted.value = false;
    end();
  });

  return {
    /** 手动执行函数 */
    run,
    /** loading状态 */
    loading,
    /** 仅在manual=true会返回，否则返回null */
    data,
  };
}
