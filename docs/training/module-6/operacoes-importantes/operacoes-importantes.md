# Operações importantes

- Identificar o usuário, hora e em qual atividade se encontra:
```java

    public class ExemploDeActivityListener implements ActivityFinishEventListener
{
	@Override
	public void onFinish(ActivityEvent activityEvent) throws ActivityException
	{
        NeoUser usuarioAtual = PortalUtil.getCurrentUser();
        GregorianCalendar dataAtual = new GregorianCalendar();
        String atividadeAtual = activityEvent.getActivity().getActivityName();

	}
}
```