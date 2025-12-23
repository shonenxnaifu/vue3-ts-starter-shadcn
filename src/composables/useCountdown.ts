import { ref, Ref, computed, onUnmounted } from 'vue';

interface CountdownFunctions {
  start: () => void;
  pause: () => void;
  reset: () => void;
  setTime: (newTime: number) => void; // Added setTime function
}

interface CountdownSetup {
  timeLeft: Ref<number>;
  isActive: Ref<boolean>;
  formattedTime: Ref<string>;
}

export const useCountdown = (initialTime = 60): CountdownSetup & CountdownFunctions => {
  const timeLeft = ref<number>(initialTime);
  const isActive = ref<boolean>(false);
  const startTime = ref<number | null>(null);
  let interval: ReturnType<typeof setInterval> | null = null;

  function updateTimeLeft(): void {
    if (isActive.value && startTime.value !== null) {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime.value) / 1000);
      timeLeft.value = Math.max(0, initialTime - elapsed);
      if (timeLeft.value === 0) {
        pause();
      }
    }
  }

  function start(): void {
    if (!isActive.value && timeLeft.value > 0) {
      isActive.value = true;
      startTime.value = Date.now() - (initialTime - timeLeft.value) * 1000;
      interval = setInterval(updateTimeLeft, 100);
    }
  }

  function pause(): void {
    if (isActive.value && interval) {
      clearInterval(interval);
      isActive.value = false;
    }
  }

  function reset(): void {
    pause();
    timeLeft.value = initialTime;
    startTime.value = null;
    start();
  }

  function setTime(newTime: number): void {
    pause();
    timeLeft.value = newTime;
    startTime.value = Date.now() - newTime * 1000;
  }

  onUnmounted(() => {
    if (interval) {
      clearInterval(interval);
    }
  });

  const formattedTime = computed(() => {
    const hours: number = Math.floor(timeLeft.value / 3600);
    const minutes: number = Math.floor((timeLeft.value % 3600) / 60);
    const seconds: number = timeLeft.value % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  });

  return {
    timeLeft,
    isActive,
    formattedTime,
    start,
    pause,
    reset,
    setTime,
  };
};